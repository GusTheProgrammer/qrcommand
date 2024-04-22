using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace QRCommand.Api.Models;

public class QRCodeSchema
{
    [Key] public Guid Id { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(25, ErrorMessage = "Title cannot be longer than 25 characters.")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Description is required.")]
    [StringLength(50, ErrorMessage = "Description cannot be longer than 50 characters.")]
    public string Description { get; set; }

    [Required(ErrorMessage = "Content is required.")]
    public string Content { get; set; } // The data encoded in the QR code

    public bool IsPublic { get; set; } = false; // Private by default

    [ForeignKey("UserId")] public IdentityUser User { get; set; } // Assuming you're using the default IdentityUser

    [Required(ErrorMessage = "User ID is required.")]
    public string UserId { get; set; }

    [Required(ErrorMessage = "Creation date is required.")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}