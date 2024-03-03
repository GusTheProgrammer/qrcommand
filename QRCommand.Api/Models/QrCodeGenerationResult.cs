namespace QRCommand.Api.Models;

public class QrCodeGenerationResult
{
    public byte[] Bytes { get; set; }
    public string Data { get; set; }
    public RenderType RenderType { get; set; }

    public static QrCodeGenerationResult FromBytes(byte[] bytes, RenderType renderType)
    {
        return new QrCodeGenerationResult { Bytes = bytes, RenderType = renderType };
    }

    public static QrCodeGenerationResult FromData(string data, RenderType renderType)
    {
        return new QrCodeGenerationResult { Data = data, RenderType = renderType };
    }
}