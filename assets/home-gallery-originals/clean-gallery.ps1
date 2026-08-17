# ============================================================
# EliotHunter.com Homepage Gallery Builder
#
# SOURCE:
#   assets/home-gallery-originals/
#
# OUTPUT:
#   src/assets/home-gallery/
#
# What it does:
#   - Finds source photographs
#   - Converts HEIC/HEIF/etc. to JPG
#   - Corrects EXIF orientation
#   - Converts to sRGB
#   - Resizes oversized images for the web
#   - Removes unnecessary metadata
#   - Renames sequentially:
#       001.jpg
#       002.jpg
#       003.jpg
#       ...
#   - Rebuilds the website gallery from scratch
#   - Leaves all originals untouched
# ============================================================


# ------------------------------------------------------------
# Settings
# ------------------------------------------------------------

$SourceFolder = $PSScriptRoot

# Script lives at:
# project/assets/home-gallery-originals/
#
# Therefore ..\.. is the project root.
$ProjectRoot = Resolve-Path (
    Join-Path $SourceFolder "..\.."
)

$OutputFolder = Join-Path `
    $ProjectRoot `
    "src\assets\home-gallery"

$MaxDimension = 1800
$JpegQuality = 88


# ------------------------------------------------------------
# Supported source formats
# ------------------------------------------------------------

$SupportedExtensions = @(
    ".heic",
    ".heif",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
    ".tif",
    ".tiff"
)


# ------------------------------------------------------------
# Make sure ImageMagick is available
# ------------------------------------------------------------

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {

    Write-Host ""
    Write-Host "ERROR: ImageMagick was not found." `
        -ForegroundColor Red

    Write-Host ""
    Write-Host "Install it with:"
    Write-Host ""

    Write-Host `
        "winget install ImageMagick.ImageMagick" `
        -ForegroundColor Yellow

    Write-Host ""

    exit 1
}


# ------------------------------------------------------------
# Find source photographs
# ------------------------------------------------------------

$Images = @(
    Get-ChildItem `
        -Path $SourceFolder `
        -File |
    Where-Object {

        $SupportedExtensions -contains `
            $_.Extension.ToLower()

    } |
    Sort-Object Name
)


if ($Images.Count -eq 0) {

    Write-Host ""
    Write-Host `
        "No supported photographs were found in:" `
        -ForegroundColor Yellow

    Write-Host $SourceFolder
    Write-Host ""

    exit 0
}


# ------------------------------------------------------------
# Create website output folder
# ------------------------------------------------------------

if (-not (Test-Path $OutputFolder)) {

    New-Item `
        -ItemType Directory `
        -Path $OutputFolder `
        -Force |
        Out-Null
}


# ------------------------------------------------------------
# Clear OLD generated website photographs
#
# This folder should contain generated files ONLY.
# The originals live safely elsewhere.
# ------------------------------------------------------------

Write-Host ""
Write-Host "Clearing old website gallery..." `
    -ForegroundColor DarkGray

Get-ChildItem `
    -Path $OutputFolder `
    -File `
    -ErrorAction SilentlyContinue |
Remove-Item -Force


# ------------------------------------------------------------
# Determine filename padding
#
# Minimum:
#   001.jpg
#
# If someday you have >999 photos:
#   0001.jpg
# ------------------------------------------------------------

$Digits = [Math]::Max(
    3,
    $Images.Count.ToString().Length
)


# ------------------------------------------------------------
# Overview
# ------------------------------------------------------------

Write-Host ""
Write-Host "============================================" `
    -ForegroundColor Cyan

Write-Host "Homepage Gallery Builder" `
    -ForegroundColor Cyan

Write-Host "============================================" `
    -ForegroundColor Cyan

Write-Host ""
Write-Host "Source:"
Write-Host "  $SourceFolder"

Write-Host ""
Write-Host "Website output:"
Write-Host "  $OutputFolder"

Write-Host ""
Write-Host "Images found: $($Images.Count)"
Write-Host "Maximum dimension: $MaxDimension px"
Write-Host "JPEG quality: $JpegQuality"
Write-Host ""


# ------------------------------------------------------------
# Convert photographs
# ------------------------------------------------------------

$Index = 1
$Failed = @()


foreach ($Image in $Images) {

    $Number = $Index.ToString("D$Digits")

    $OutputFile = Join-Path `
        $OutputFolder `
        "$Number.jpg"


    Write-Host `
        "[$Index/$($Images.Count)] $($Image.Name) -> $Number.jpg"


    # [0] selects the first image/frame.
    #
    # This is useful because some HEIC files can contain
    # auxiliary images or multiple frames.
    $InputImage = "$($Image.FullName)[0]"


    & magick `
        $InputImage `
        -auto-orient `
        -colorspace sRGB `
        -resize "$($MaxDimension)x$($MaxDimension)>" `
        -strip `
        -quality $JpegQuality `
        $OutputFile


    if ($LASTEXITCODE -ne 0) {

        Write-Host `
            "    FAILED: $($Image.Name)" `
            -ForegroundColor Red

        $Failed += $Image.Name

        continue
    }


    $Index++
}


# ------------------------------------------------------------
# Results
# ------------------------------------------------------------

$Created = @(
    Get-ChildItem `
        -Path $OutputFolder `
        -Filter "*.jpg" `
        -File
)


Write-Host ""
Write-Host "============================================" `
    -ForegroundColor Green

Write-Host "Gallery build complete." `
    -ForegroundColor Green

Write-Host "============================================" `
    -ForegroundColor Green

Write-Host ""
Write-Host "Source images: $($Images.Count)"
Write-Host "Website images created: $($Created.Count)"
Write-Host "Failures: $($Failed.Count)"

Write-Host ""
Write-Host "Website gallery:"
Write-Host "  $OutputFolder"


if ($Failed.Count -gt 0) {

    Write-Host ""
    Write-Host "FAILED FILES:" `
        -ForegroundColor Red

    foreach ($File in $Failed) {
        Write-Host "  $File"
    }
}


Write-Host ""