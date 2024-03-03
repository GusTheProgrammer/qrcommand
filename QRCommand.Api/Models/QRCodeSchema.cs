using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace QRCommand.Api.Models;

public class QRCodeSchema
{
    [Key] public Guid Id { get; set; }

    [Required] public string Content { get; set; } // The data encoded in the QR code

    public bool IsPublic { get; set; } = false; // Private by default

    [ForeignKey("UserId")] public IdentityUser User { get; set; } // Assuming you're using the default IdentityUser

    public string UserId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}