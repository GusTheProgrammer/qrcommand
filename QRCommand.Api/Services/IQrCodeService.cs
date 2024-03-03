namespace QRCommand.Api.Services;

using QRCommand.Api.Dtos;
using QRCommand.Api.Models;

public interface IQrCodeService
{
    Task<QRCodeSchema> CreateQrCodeAsync(string userId, QrCodesDto qrCodesDto);
    Task<QrCodesResponseDto> GetQrCodeAsync(Guid id);
    Task<bool> UpdateQrCodeAsync(Guid id, string userId, QrCodesDto qrCodesDto);
    Task<bool> DeleteQrCodeAsync(Guid id, string userId);
    Task<IEnumerable<QrCodesResponseDto>> GetAllQrCodesForUserAsync(string userId);
}