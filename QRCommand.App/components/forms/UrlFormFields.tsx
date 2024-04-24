import React from 'react';
import { Input } from "~/components/ui/input";
import { useFormContext } from "react-hook-form";

export function UrlForm() {
  const { register, setValue } = useFormContext();

  React.useEffect(() => {
    register('url');
  }, [register]);

  return (
    <Input
      onChangeText={text => setValue("url", text)}
      placeholder="URL"
    />
  );
}
