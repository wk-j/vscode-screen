#addin "wk.StartProcess"

using PS = StartProcess.Processor;

Task("Default").Does(() => {
    PS.StartProcess("dotnet script scripts/CreateLogo.csx");
});

RunTarget("Default");