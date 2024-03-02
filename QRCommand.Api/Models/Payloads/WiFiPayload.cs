namespace QRCommand.Api.Models.Payloads;

/// <summary>
/// Represents the payload for generating a WiFi network connection QR code.
/// </summary>
public class WiFiPayload
{
    /// <summary>
    /// The SSID (network name) of the WiFi network.
    /// </summary>
    public string Ssid { get; set; }

    /// <summary>
    /// The password of the WiFi network.
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// Indicates whether the network uses WPA/WPA2 security.
    /// </summary>
    public bool IsWPA { get; set; }
}