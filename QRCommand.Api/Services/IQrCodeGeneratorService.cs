using QRCommand.Api.Models;

namespace QRCommand.Api.Services;

public interface IQrCodeGeneratorService
{
    Task<string> GenerateQrCodeAsync(string payload, RenderType renderType = RenderType.Base64);
}