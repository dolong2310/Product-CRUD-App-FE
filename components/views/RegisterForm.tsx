"use client";

import { authApi } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleErrorApi } from "@/lib/utils";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useUserStore } from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash-es";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputPassword from "../InputPassword";

type Props = {};

const RegisterForm = (props: Props) => {
  const router = useRouter();

  const { user, setUser } = useUserStore();

  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isValid, isDirty },
    control,
    handleSubmit,
    setError,
  } = form;

  const onSubmit = async (values: RegisterBodyType) => {
    setLoading(true);
    try {
      const response = await authApi.register(values);
      const userData = get(response, "data.account");
      console.log("response: ", response.data.account);
      setUser(userData);

      toast.success("Registration successful!", {
        description: "You have successfully registered.",
      });
      router.push("/me");
    } catch (error: any) {
      handleErrorApi({
        error,
        setError,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto mt-8"
      >
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

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <InputPassword placeholder="Confirm your password" {...field} />
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

export default RegisterForm;
