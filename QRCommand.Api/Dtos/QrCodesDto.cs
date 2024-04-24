using System.ComponentModel.DataAnnotations;

namespace QRCommand.Api.Dtos;

/// <summary>
/// DTO for creating or updating a QR code.
/// </summary>
public class QrCodesDto
{
    /// <summary>
    /// The Title of the QR code.
    /// </summary>    
    [Required(ErrorMessage = "Title is required")]
    [StringLength(25, ErrorMessage = "Title cannot be longer than 25 characters.")]
    public string Title { get; set; }

    /// <summary>
    /// The description of the QR code.
    /// </summary>
    [Required(ErrorMessage = "Description is required")]
    [StringLength(50, ErrorMessage = "Description cannot be longer than 50 characters.")]
    public string Description { get; set; }

    /// <summary>
    /// The content of the QR code.
    /// </summary>
    [Required(ErrorMessage = "Content is required")]
    public string Content { get; set; }
    
    /// <summary>
    ///  The type of the QR code.
    /// </summary>
    [Required(ErrorMessage = "QR Code Type is required")]
    [StringLength(50, ErrorMessage = "QR Code Type cannot be longer than 50 characters.")]
    public string Type { get; set; } // Type of the QR code


    /// <summary>
    /// Indicates whether the QR code is public.
    /// </summary>
    [Required(ErrorMessage = "IsPublic is required")]
    public bool IsPublic { get; set; }
}