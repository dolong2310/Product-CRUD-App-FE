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
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputPassword from "../InputPassword";
import { useUserStore } from "@/stores/userStore";
import { get } from "lodash-es";

type Props = {};

const LoginForm = (props: Props) => {
  const router = useRouter();

  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    setError,
  } = form;

  const onSubmit = async (values: LoginBodyType) => {
    setLoading(true);
    try {
      const response = await authApi.login(values);
      const userData = get(response, "data.account");
      console.log("response: ", response.data.account);
      setUser(userData);

      toast.success("Login successful!", {
        description: "You have successfully logged in.",
      });
      router.push("/");
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

export default LoginForm;
