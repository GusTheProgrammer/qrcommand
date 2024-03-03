namespace QRCommand.Api.Dtos;

/// <summary>
/// DTO for QR code response.
/// </summary>
public class QrCodesResponseDto
{
    /// <summary>
    /// The ID of the QR code.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The content of the QR code.
    /// </summary>
    public string Content { get; set; }

    /// <summary>
    /// Indicates whether the QR code is public.
    /// </summary>
    public bool IsPublic { get; set; }

    /// <summary>
    /// The ID of the user who owns the QR code.
    /// </summary>
    public string UserId { get; set; }

    /// <summary>
    /// The creation date and time of the QR code.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// The last update date and time of the QR code.
    /// </summary>
    public DateTime? UpdatedAt { get; set; }
}