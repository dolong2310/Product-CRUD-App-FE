"use client";

import { accountApi } from "@/apis/account";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleErrorApi } from "@/lib/utils";
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import UploadImage from "../UploadImage";
import { productApi } from "@/apis/product";
import { useUserStore } from "@/stores/userStore";
import { get } from "lodash-es";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  profileData: AccountResType["data"];
};

const ProfileForm = ({ profileData }: Props) => {
  const router = useRouter();

  const { setUser } = useUserStore();

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profileData.name || "",
      avatar: profileData.avatar || "",
    },
  });

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    setError,
  } = form;

  const formImage = form.watch("avatar");

  const mutation = useMutation({
    mutationFn: async (values: UpdateMeBodyType) => {
      setLoading(true);
      const imageUrl = imageFile
        ? (await productApi.uploadImage(imageFile!)).data
        : formImage;
      const response = await accountApi.updateProfile({
        ...values,
        avatar: imageUrl,
      });
      return get(response, "data");
    },
    onSuccess: (userData) => {
      setUser(userData);
      toast.success("Profile updated successfully!", {
        description: "Your profile has been updated.",
      });
      router.push("/me");
      queryClient.invalidateQueries({ queryKey: ["profileClient"], exact: true });
    },
    onError: (error) => {
      handleErrorApi({
        error,
        setError,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (values: UpdateMeBodyType) => mutation.mutate(values);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto mt-8"
      >
        <FormField
          control={control}
          name="avatar"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <UploadImage
                    src={formImage || ""}
                    onChange={(file) => {
                      setImageFile(file);
                      field.onChange(window.location.origin + "/" + file.name);
                    }}
                    onRemove={() => {
                      setImageFile(null);
                      form.setValue("avatar", "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <FormItem>
          <FormLabel className="flex items-center gap-2">
            Email <FormDescription>(Read only)</FormDescription>
          </FormLabel>
          <Input readOnly value={profileData.email} />
        </FormItem>

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-4 py-5 text-lg font-semibold"
          disabled={(!isDirty && !isValid) || loading}
          // loading={loading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
