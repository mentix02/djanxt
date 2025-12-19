"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdatePersonalInfoData, UpdatePersonalInfoSchema } from "@/actions/auth/types";

import authClient from "@/lib/auth-client";

interface UpdatePersonalInformationProps {
  name: string;
}

export default function UpdatePersonalInformation({ name }: UpdatePersonalInformationProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { name },
    resolver: zodResolver(UpdatePersonalInfoSchema),
  });

  const updateNameHandler: SubmitHandler<UpdatePersonalInfoData> = async (values) => {
    await authClient.updateUser(values);
  };

  return (
    <Box
      gap={2}
      display="flex"
      flexWrap="wrap"
      component="form"
      alignItems="flex-start"
      onSubmit={handleSubmit(updateNameHandler)}
    >
      <TextFieldElement fullWidth name="name" size="small" label="Full Name" control={control} sx={{ flexGrow: 1 }} />
      <Button variant="contained" type="submit" loading={isSubmitting}>
        {isSubmitting ? "Saving..." : "Update Name"}
      </Button>
    </Box>
  );
}
