import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ModelSelectorProps {
  selectedModel: 'sphere' | 'torus' | 'cylinder';
  onModelChange: (model: 'sphere' | 'torus' | 'cylinder') => void;
}

const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  const models = [
    {
      type: 'sphere' as const,
      name: 'Spherical Habitat',
      description: 'Compact design for orbital stations'
    },
    {
      type: 'torus' as const,
      name: 'Rotating Ring',
      description: 'Creates artificial gravity through rotation'
    },
    {
      type: 'cylinder' as const,
      name: 'Cylindrical Module',
      description: 'Modular design for scalable construction'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {models.map((model) => (
        <Card
          key={model.type}
          className={`cursor-pointer transition-all duration-300 ${
            selectedModel === model.type
              ? 'border-primary shadow-lg shadow-primary/20'
              : 'border-border hover:border-primary/40'
          }`}
          onClick={() => onModelChange(model.type)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{model.name}</CardTitle>
            <CardDescription className="text-sm">{model.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant={selectedModel === model.type ? "default" : "outline"}
              size="sm"
              className="w-full"
            >
              {selectedModel === model.type ? 'Viewing' : 'View Model'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModelSelector;
