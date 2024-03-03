using System.ComponentModel.DataAnnotations;

namespace QRCommand.Api.Dtos;

/// <summary>
/// DTO for creating or updating a QR code.
/// </summary>
public class QrCodesDto
{
    /// <summary>
    /// The content of the QR code.
    /// </summary>
    [Required(ErrorMessage = "Content is required")]
    public string Content { get; set; }

    /// <summary>
    /// Indicates whether the QR code is public.
    /// </summary>
    [Required(ErrorMessage = "IsPublic is required")]
    public bool IsPublic { get; set; }
}