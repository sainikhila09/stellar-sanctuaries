import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Home, Cpu, Heart, Zap, Database, Wind, Shield } from "lucide-react";
import HabitatModel3D from "@/components/HabitatModel3D";
import ModelSelector from "@/components/ModelSelector";
import heroImage from "@/assets/space-habitat-hero.jpg";
import interiorImage from "@/assets/habitat-interior.jpg";
import marsImage from "@/assets/mars-habitat.jpg";
import expandableImage from "@/assets/expandable-habitat.jpg";

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<'sphere' | 'torus' | 'cylinder'>('sphere');
  const criticalFunctions = [
    {
      icon: Wind,
      title: "Life Support",
      description: "Advanced systems providing breathable air, water recycling, and atmospheric control"
    },
    {
      icon: Zap,
      title: "Power Systems",
      description: "Solar arrays and nuclear power generation ensuring continuous energy supply"
    },
    {
      icon: Heart,
      title: "Medical Care",
      description: "Comprehensive healthcare facilities for crew health monitoring and treatment"
    },
    {
      icon: Shield,
      title: "Thermal Control",
      description: "Sophisticated temperature regulation protecting against extreme space conditions"
    },
    {
      icon: Database,
      title: "Waste Management",
      description: "Efficient recycling systems converting waste into usable resources"
    },
    {
      icon: Cpu,
      title: "Communications",
      description: "High-bandwidth systems maintaining contact with Earth and mission control"
    }
  ];

  const habitatConcepts = [
    {
      image: interiorImage,
      title: "Rotating Habitats",
      description: "Cylindrical structures that create artificial gravity through rotation, enabling normal living conditions in space"
    },
    {
      image: marsImage,
      title: "Planetary Surface",
      description: "Domed structures built on planetary surfaces like Mars, utilizing local resources for construction and sustainability"
    },
    {
      image: expandableImage,
      title: "Expandable Modules",
      description: "Inflatable habitat modules that launch compact and expand in orbit, maximizing usable space while minimizing launch mass"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-float">
            <Rocket className="w-20 h-20 mx-auto mb-6 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
            Space Habitats
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Homes in Space: Engineering the Future of Human Exploration
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Explore the Technology
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* 3D Model Preview Section */}
      <section className="py-24 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Interactive 3D Models
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore different space habitat geometries in 3D. Click and drag to rotate, scroll to zoom.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-8">
            <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>

          <div className="max-w-4xl mx-auto">
            <HabitatModel3D habitatType={selectedModel} />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              These models represent simplified concepts of actual space habitat designs being developed by space agencies worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Are Space Habitats?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Space habitats are sophisticated "homes in space" designed to keep crew members healthy, safe, 
            and capable of executing their missions. Whether situated on planetary surfaces or orbiting in the 
            depths of space, these revolutionary structures must support all aspects of human life in the most 
            extreme environment imaginable. They represent humanity's bold step toward becoming a multi-planetary species.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader>
              <Home className="w-12 h-12 mb-4 text-primary" />
              <CardTitle className="text-2xl">Living Spaces</CardTitle>
              <CardDescription className="text-base">
                Carefully designed quarters for sleep, work, exercise, and recreation ensuring crew well-being during extended missions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
            <CardHeader>
              <Shield className="w-12 h-12 mb-4 text-secondary" />
              <CardTitle className="text-2xl">Protection Systems</CardTitle>
              <CardDescription className="text-base">
                Advanced shielding against cosmic radiation, micrometeoroids, and extreme temperature fluctuations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Critical Functions */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Critical Systems
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {criticalFunctions.map((func, index) => {
              const Icon = func.icon;
              return (
                <Card 
                  key={index} 
                  className="border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardHeader>
                    <Icon className="w-10 h-10 mb-3 text-primary" />
                    <CardTitle className="text-xl">{func.title}</CardTitle>
                    <CardDescription>{func.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Each system must function flawlessly, as the crew depends on these technologies for survival. 
              Additional critical functions include food storage and preparation, stowage, and communication systems 
              that maintain vital connections with mission control and Earth.
            </p>
          </div>
        </div>
      </section>

      {/* Habitat Concepts */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Diverse Habitat Concepts
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Space habitat designs vary dramatically based on mission requirements, location, and technological approach. 
            From rotating structures creating artificial gravity to expandable modules and planetary surface bases, 
            each concept offers unique advantages for long-term human presence in space.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {habitatConcepts.map((concept, index) => (
            <Card 
              key={index}
              className="overflow-hidden border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={concept.image} 
                  alt={concept.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{concept.title}</CardTitle>
                <CardDescription className="text-base">
                  {concept.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto border-secondary/20 bg-gradient-to-br from-card to-card/50">
            <CardContent className="pt-8">
              <p className="text-lg leading-relaxed">
                Modern space habitat concepts incorporate diverse materials, innovative geometries, and flexible layouts. 
                Engineers continuously develop new approaches combining lightweight composites, 3D-printed structures, 
                and in-situ resource utilization to create sustainable, long-term living environments beyond Earth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Advancing humanity&apos;s presence in space, one habitat at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
