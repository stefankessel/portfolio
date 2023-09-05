"use client";
import { FormEvent, useState, useRef } from "react";
import { v4 } from "uuid";
import { Storage, API, graphqlOperation } from "aws-amplify";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { createEmployee } from "@/graphql/mutations";
import { FormDataType, NewDataEntryType } from "@/types/data-entry-types";

type Props = {};

export default function Form({}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
  });

  const [imagePath, setImagePath] = useState<string | null>(null);

  // handleSubmit function => upload image to s3 and push data to dynamodb via graphql appsync
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { name, email } = formData;
      const id = v4();

      //upload to S3
      Storage.configure({ region: "eu-central-1" });
      const { key } = await Storage.put(`${id}.jpg`, imagePath, {
        contentType: "image/jpg",
      });

      const newDataEntry: NewDataEntryType = {
        id,
        name,
        email,
        imgPath: key,
      };

      // persist data to dynamodb
      await API.graphql(
        graphqlOperation(createEmployee, { input: newDataEntry })
      );

      setFormData({ email: "", name: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePath(file.name);
    } else {
      setImagePath(null);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        id="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        id="name"
        placeholder="Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Label htmlFor="picture">Picture - PNG only</Label>
      <Input
        id="picture"
        type="file"
        onChange={handleImageChange}
        required
        ref={fileInputRef}
      />
      <Button type="submit" variant="outline">
        Subscribe
      </Button>
    </form>
  );
}
