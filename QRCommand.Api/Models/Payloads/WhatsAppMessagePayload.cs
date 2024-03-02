namespace QRCommand.Api.Models.Payloads;

/// <summary>
/// Represents the payload for generating a WhatsApp message QR code.
/// </summary>
public class WhatsAppMessagePayload
{
    /// <summary>
    /// The phone number to which the WhatsApp message should be sent.
    /// </summary>
    public string PhoneNumber { get; set; }

    /// <summary>
    /// The message content to be sent via WhatsApp.
    /// </summary>
    public string Message { get; set; }
}
