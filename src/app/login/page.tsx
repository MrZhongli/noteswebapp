"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from 'lucide-react';

function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (res?.error) {
                setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
                setLoading(false);
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
            setLoading(false);
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image
                        className="mx-auto h-12 w-auto"
                        src="/mc-logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email-address"
                                type="email"
                                {...register("email", {
                                    required: "El email es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "El email no es válido",
                                    },
                                })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>

                    {(errors.email || errors.password || error) && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Se encontraron los siguientes errores:
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            {errors.email && <li>{errors.email.message as string}</li>}
                                            {errors.password && <li>{errors.password.message as string}</li>}
                                            {error && <li>{error}</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

