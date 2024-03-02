namespace QRCommand.Api.Models.Payloads;

/// <summary>
/// Represents the payload for generating an email QR code.
/// </summary>
public class EmailPayload
{
    /// <summary>
    /// The recipient's email address.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// The subject of the email.
    /// </summary>
    public string Subject { get; set; }

    /// <summary>
    /// The body message of the email.
    /// </summary>
    public string Message { get; set; }
}
