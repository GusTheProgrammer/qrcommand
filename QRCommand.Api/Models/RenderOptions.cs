using QRCoder;

namespace QRCommand.Api.Models;

public enum SizingMode
{
    WidthHeightAttribute,
    ViewBoxAttribute
}

public class RenderOptions
{
    // Common
    public int PixelsPerModule { get; set; } = 20; // Default value
    public RenderType RenderType { get; set; } = RenderType.Image;

    // SVG specific
    public string DarkColorHtmlHex { get; set; } = "#000000";
    public string LightColorHtmlHex { get; set; } = "#ffffff";
    public bool DrawQuietZones { get; set; } = true;

    // PDF specific
    public int Dpi { get; set; } = 150;
    public long JpgQuality { get; set; } = 85;

    // ASCII specific
    public int RepeatPerModule { get; set; } = 1;
    public string DarkColorString { get; set; } = "██";
    public string WhiteSpaceString { get; set; } = "  ";
    public string EndOfLine { get; set; } = "\n";

    // Base64 specific
    public Base64QRCode.ImageType ImgType { get; set; } = Base64QRCode.ImageType.Png;
}