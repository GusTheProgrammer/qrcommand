using System.ComponentModel.DataAnnotations;

namespace QRCommand.Api.Models;

using QRCoder;

public class QrCodeRequest
{
    [Required(ErrorMessage = "PlainText is required")]
    public string PlainText { get; set; }

    public QRCodeGenerator.ECCLevel EccLevel { get; set; } = QRCodeGenerator.ECCLevel.Q;
    public bool ForceUtf8 { get; set; } = false;
    public bool Utf8BOM { get; set; } = false;
    public QRCodeGenerator.EciMode EciMode { get; set; } = QRCodeGenerator.EciMode.Default;

    [ValidRequestedVersion(ErrorMessage = "RequestedVersion must be either -1 or between 1 and 40.")]
    public int RequestedVersion { get; set; } = -1;
}