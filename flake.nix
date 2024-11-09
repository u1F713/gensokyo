{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      inherit (nixpkgs.lib) genAttrs;
      systems = [
        "x86_64-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      eachSystem = f: genAttrs systems (s: f { pkgs = nixpkgs.legacyPackages.${s}; });
    in
    {
      devShells = eachSystem (
        { pkgs }:
        {
          default = pkgs.mkShell {
            BIOME_BINARY = "${pkgs.biome}/bin/biome";
            PLAYWRIGHT_BROWSERS_PATH = pkgs.playwright-driver.browsers;

            packages = with pkgs; [
              nodejs_latest
              pnpm
              biome
            ];
          };
        }
      );
      formatter = eachSystem ({ pkgs }: pkgs.nixfmt-rfc-style);
    };
}
