namespace QRCommand.Api.Models.Payloads;

public enum GeolocationEncoding
{
    GEO,
    GoogleMaps
}

/// <summary>
/// Represents the payload for generating a geolocation QR code.
/// </summary>
public class GeolocationPayload
{
    /// <summary>
    /// The latitude of the location.
    /// </summary>
    public string Latitude { get; set; }

    /// <summary>
    /// The longitude of the location.
    /// </summary>
    public string Longitude { get; set; }

    /// <summary>
    /// The encoding type for the geolocation, either GEO (for geo URI scheme) or GoogleMaps.
    /// </summary>
    public GeolocationEncoding Encoding { get; set; }
}