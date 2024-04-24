namespace QRCommand.Api.Services;

using QRCoder;
using System;
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


                case RenderType.Svg:
                    var qrCodeSvg = new SvgQRCode(qrCodeData);
                    return qrCodeSvg.GetGraphic(20);

                case RenderType.Base64:
                    var qrCodeBase64 = new Base64QRCode(qrCodeData);
                    return qrCodeBase64.GetGraphic(20);

                case RenderType.Ascii:
                    var qrCodeAscii = new AsciiQRCode(qrCodeData);
                    return qrCodeAscii.GetGraphic(1);

             

                default:
                    throw new ArgumentException("Unsupported render type.");
            }
        });
    }
}