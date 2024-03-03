namespace QRCommand.Api.Services;

using QRCoder;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using QRCommand.Api.Models;

public class QRCodeGeneratorService : IQrCodeGeneratorService
{
    public async Task<string> GenerateQrCodeAsync(string payload, RenderType renderType = RenderType.Base64)
    {
        return await Task.Run(() =>
        {
            var qrGenerator = new QRCodeGenerator();
            var qrCodeData = qrGenerator.CreateQrCode(payload, QRCodeGenerator.ECCLevel.Q);

            switch (renderType)
            {
                case RenderType.Image:
                    using (var qrCode = new QRCode(qrCodeData))
                    {
                        using var qrCodeImage = qrCode.GetGraphic(20);
                        using var ms = new MemoryStream();
                        qrCodeImage.Save(ms, ImageFormat.Png);
                        return "data:image/png;base64," + Convert.ToBase64String(ms.ToArray());
                    }

                case RenderType.Svg:
                    var qrCodeSvg = new SvgQRCode(qrCodeData);
                    return qrCodeSvg.GetGraphic(20);

                case RenderType.Base64:
                    var qrCodeBase64 = new Base64QRCode(qrCodeData);
                    return qrCodeBase64.GetGraphic(20);

                case RenderType.Ascii:
                    var qrCodeAscii = new AsciiQRCode(qrCodeData);
                    return qrCodeAscii.GetGraphic(1);

                case RenderType.Pdf:
                    using (var qrCode = new QRCode(qrCodeData))
                    {
                        using var qrCodeImage = qrCode.GetGraphic(20);
                        using var ms = new MemoryStream();
                        qrCodeImage.Save(ms,
                            ImageFormat
                                .Png); // PDF generation would typically be more complex and require a separate library
                        return "data:application/pdf;base64," + Convert.ToBase64String(ms.ToArray());
                    }

                default:
                    throw new ArgumentException("Unsupported render type.");
            }
        });
    }
}