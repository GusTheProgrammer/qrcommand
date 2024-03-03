using Microsoft.EntityFrameworkCore;
using QRCommand.Api.Data;
using QRCommand.Api.Dtos;
using QRCommand.Api.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QRCommand.Api.Services
{
    public class QrCodeService : IQrCodeService
    {
        private readonly ApplicationDbContext _context;

        public QrCodeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<QRCodeSchema> CreateQrCodeAsync(string userId, QrCodesDto qrCodesDto)
        {
            var qrCode = new QRCodeSchema
            {
                Content = qrCodesDto.Content,
                IsPublic = qrCodesDto.IsPublic,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.QRCodes.Add(qrCode);
            await _context.SaveChangesAsync();
            return qrCode;
        }

        public async Task<QrCodesResponseDto> GetQrCodeAsync(Guid id)
        {
            var qrCode = await _context.QRCodes
                .Where(q => q.Id == id)
                .Select(q => new QrCodesResponseDto
                {
                    Id = q.Id,
                    Content = q.Content,
                    IsPublic = q.IsPublic,
                    UserId = q.UserId,
                    CreatedAt = q.CreatedAt,
                    UpdatedAt = q.UpdatedAt
                })
                .FirstOrDefaultAsync();

            return qrCode;
        }


        public async Task<IEnumerable<QrCodesResponseDto>> GetAllQrCodesForUserAsync(string userId)
        {
            var qrCodes = await _context.QRCodes
                .Where(q => q.UserId == userId)
                .Select(q => new QrCodesResponseDto
                {
                    Id = q.Id,
                    Content = q.Content,
                    IsPublic = q.IsPublic,
                    UserId = q.UserId,
                    CreatedAt = q.CreatedAt,
                    UpdatedAt = q.UpdatedAt
                })
                .ToListAsync();

            return qrCodes;
        }


        public async Task<bool> UpdateQrCodeAsync(Guid id, string userId, QrCodesDto qrCodesDto)
        {
            var qrCode = await _context.QRCodes
                .Where(q => q.Id == id && q.UserId == userId)
                .FirstOrDefaultAsync();

            if (qrCode == null)
            {
                return false;
            }

            qrCode.Content = qrCodesDto.Content;
            qrCode.IsPublic = qrCodesDto.IsPublic;
            qrCode.UpdatedAt = DateTime.UtcNow;

            _context.QRCodes.Update(qrCode);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteQrCodeAsync(Guid id, string userId)
        {
            var qrCode = await _context.QRCodes
                .Where(q => q.Id == id && q.UserId == userId)
                .FirstOrDefaultAsync();

            if (qrCode == null)
            {
                return false;
            }

            _context.QRCodes.Remove(qrCode);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}