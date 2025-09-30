import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ZoomIn, ZoomOut, RotateCcw, Rocket } from "lucide-react";
import HabitatDesignerCanvas from "@/components/HabitatDesigner";
import { useNavigate } from "react-router-dom";

const Designer = () => {
  const navigate = useNavigate();
  const [shape, setShape] = useState<'dome' | 'cylinder' | 'torus'>('dome');
  const [radius, setRadius] = useState(2);
  const [heightLength, setHeightLength] = useState(3);
  const [zoom, setZoom] = useState(1);

  const handleGenerateHabitat = () => {
    // Reset zoom and regenerate
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <Rocket className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Space Habitat Layout Designer</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Inputs */}
        <aside className="w-64 border-r border-border bg-card/30 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Inputs Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Inputs</h2>
              
              <div className="space-y-4">
                {/* Shape Selection */}
                <div className="space-y-2">
                  <Label htmlFor="shape">Shape</Label>
                  <Select value={shape} onValueChange={(value: any) => setShape(value)}>
                    <SelectTrigger id="shape" className="bg-background">
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="dome">Dome</SelectItem>
                      <SelectItem value="cylinder">Cylinder</SelectItem>
                      <SelectItem value="torus">Torus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Radius Input */}
                <div className="space-y-2">
                  <Label htmlFor="radius">Radius (m)</Label>
                  <Input
                    id="radius"
                    type="number"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={radius}
                    onChange={(e) => setRadius(parseFloat(e.target.value) || 2)}
                    className="bg-background"
                  />
                </div>

                {/* Height/Length Input */}
                <div className="space-y-2">
                  <Label htmlFor="heightLength">Height/Length (m)</Label>
                  <Input
                    id="heightLength"
                    type="number"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={heightLength}
                    onChange={(e) => setHeightLength(parseFloat(e.target.value) || 3)}
                    className="bg-background"
                  />
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerateHabitat}
                  className="w-full"
                >
                  Generate Habitat
                </Button>
              </div>
            </div>

            <Separator />

            {/* Zoom Controls Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Zoom Controls</h2>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <ZoomIn className="w-5 h-5" />
                  <span className="text-xs">Zoom In</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <ZoomOut className="w-5 h-5" />
                  <span className="text-xs">Zoom Out</span>
                </Button>
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={handleReset}
                className="w-full mt-2 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>

            {/* Info Card */}
            <Card className="border-primary/20 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Current Settings</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Shape:</span>
                  <span className="font-medium text-foreground capitalize">{shape}</span>
                </div>
                <div className="flex justify-between">
                  <span>Radius:</span>
                  <span className="font-medium text-foreground">{radius}m</span>
                </div>
                <div className="flex justify-between">
                  <span>Height/Length:</span>
                  <span className="font-medium text-foreground">{heightLength}m</span>
                </div>
                <div className="flex justify-between">
                  <span>Zoom:</span>
                  <span className="font-medium text-foreground">{zoom.toFixed(1)}x</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 p-6 bg-gradient-to-br from-background to-card/20">
          <div className="h-full border-2 border-dashed border-border rounded-lg overflow-hidden glow-box">
            <HabitatDesignerCanvas
              shape={shape}
              radius={radius}
              heightLength={heightLength}
              zoom={zoom}
              onZoomChange={setZoom}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Preview will update as you adjust the parameters. Click and drag to rotate, scroll to zoom.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Designer;
