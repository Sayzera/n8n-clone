"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formMessages } from "@/constants/form/messages";
import { authClient } from "@/lib/auth-client";

const registerSchema = z
  .object({
    email: z.email(formMessages.emailValid),
    password: z.string().min(1, formMessages.required),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: formMessages.passwordsDontMatch,
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email({
      name: values.email,
      email: values.email,
      password: values.password,
      callbackURL: '/'
    },
  {
    onSuccess: () => {
      router.push("/")
    },
    onError: (ctx) => {
      toast.error(ctx.error.message)
    }

  })
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Hadi başlayalım!</CardTitle>
          <CardDescription>Kayıt ol ve devam et</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
              <Button
                  variant={"outline"}
                  className="w-full"
                  type="button"
                  disabled={isPending}
                >
                  <Image src={'/logos/github.svg'} width={20} height={20} alt="Niltek yazılım github ile giriş yap butonu" />
                  Github ile devam et
                </Button>
                <Button
                  variant={"outline"}
                  className="w-full"
                  type="button"
                  disabled={isPending}
                >
                  <Image src={'/logos/google.svg'} width={20} height={20} alt="Niltek yazılım google ile giriş yap butonu" />
                  Google ile devam et
                </Button>
              </div>
              <div className="grid gap-6">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>E-Posta</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        placeholder="m@ornek.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Şifre</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        autoComplete="off"
                        type="password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Tekrar Şifre</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        autoComplete="off"
                        type="password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                Kayıt ol
              </Button>

              <div className="text-center text-sm">
                Zaten bir hesabım var{" "}
                <Link href={"/login"} className="underline underline-offset-4">
                  Giriş Yap
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
