"use client";

import { useForm } from "react-hook-form";
import { passwordSchema } from "@/lib/validation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecoveryMutation } from "@/services/auth/authApi";
import { toast } from "sonner";
import { use } from "react";

const Page = ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = use(params);
  const [recovery, { isLoading }] = useRecoveryMutation();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      const data = { password: values.password };
      const res = await recovery({ body: data, token }).unwrap();
      if (res) {
        window.location.href = "http://localhost:3000/auth";
        form.reset();
      }
    } catch (error) {
      toast(error.data.message);
    }
  }

  return (
    <div className="w-full h-screen mt-10">
      <div className="flex flex-col items-center justify-center">
        <div className="lg:w-1/3 md:w-2/3 p-8 bg-neutral-900 rounded-2xl">
          <h1 className="text-4xl mb-4">Hisobni tiklash</h1>
          <p className="text-muted-foreground">
            Sizni yana ko'rib turganimizdan hursanmiz, akauntingizni tiklang va
            o'sishda davom eting
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-8"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        className="col-span-1"
                        type="password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm password</Label>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        {...field}
                        className="col-span-1"
                        type="password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                Parolni o'zgartirish
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
