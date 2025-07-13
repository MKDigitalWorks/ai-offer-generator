"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface OfferFormData {
  name: string;
  title: string;
  duration: string;
  price: string;
  targetAudience: string;
  description: string;
}

export function OfferFormStyled() {
  const [formData, setFormData] = useState<OfferFormData>({
    name: "",
    title: "",
    duration: "",
    price: "",
    targetAudience: "",
    description: "",
  });

  const [generatedOffer, setGeneratedOffer] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const offerText = `
🔹 Offer: ${formData.title}
🔹 Created by: ${formData.name}
🔹 Duration: ${formData.duration} weeks
🔹 Price: €${formData.price}
🔹 Target Audience: ${formData.targetAudience}

📝 Description:
${formData.description}
`;

    setGeneratedOffer(offerText.trim());
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle>Create Your Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (weeks)</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (€)</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Generate Offer
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedOffer && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">
              {generatedOffer}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
