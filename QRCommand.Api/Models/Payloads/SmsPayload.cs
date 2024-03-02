namespace QRCommand.Api.Models.Payloads;

/// <summary>
/// Represents the payload for generating an SMS QR code.
/// </summary>
public class SmsPayload
{
    /// <summary>
    /// The phone number to which the SMS should be sent.
    /// </summary>
    public string PhoneNumber { get; set; }

    /// <summary>
    /// The message content of the SMS.
    /// </summary>
    public string Message { get; set; }
}
