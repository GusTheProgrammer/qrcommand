namespace QRCommand.Api.Models.Payloads;

/// <summary>
/// Represents the payload for generating a URL QR code.
/// </summary>
public class UrlPayload
{
    /// <summary>
    /// The URL to be encoded into the QR code.
    /// </summary>
    public string Url { get; set; }
}
