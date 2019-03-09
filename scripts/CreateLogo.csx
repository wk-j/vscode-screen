#! "netcoreapp2.1"
#r "nuget:wk.SquareLogo"

using SquareLogo;

var settings = new LogoSettings {
    NoSquare = true,
    FontFamily = "Fira Code",
    FontSize = 50,
    Padding = 30,
    Foreground = "White",
    Background = "Blue"
};

var logo = new Logo();
logo.CreateLogo("> screen", "images/icon.png", settings);
