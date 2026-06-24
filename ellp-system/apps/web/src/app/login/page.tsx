/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  const [registerNome, setRegisterNome] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerSenha, setRegisterSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(loginEmail, loginSenha);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Falha ao entrar");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(registerNome, registerEmail, registerSenha);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Falha ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Painel esquerdo: branding ── */}
      <div className="hidden lg:flex relative bg-sidebar text-sidebar-foreground p-12 flex-col justify-between overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none">
              ELLP
            </div>
            <div className="text-xs text-sidebar-foreground/70">
              UTFPR · Extensão
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Gestão simples para oficinas{" "}
            <span className="text-accent">extraordinárias</span>.
          </h1>
          <p className="mt-4 text-sidebar-foreground/80 max-w-md text-base">
            Cadastre alunos, organize oficinas, registre presença e acompanhe a
            aprovação automaticamente — tudo em um só lugar.
          </p>
        </div>

        {/* Rodapé */}
        <p className="text-xs text-sidebar-foreground/50 relative z-10">
          © {new Date().getFullYear()} Projeto de Extensão ELLP — UTFPR
        </p>

        {/* Decorações de blur */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      </div>

      {/* ── Painel direito: formulário ── */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <Card className="w-full max-w-md p-8 shadow-[var(--shadow-elevated)]">
          {/* Logo visível só no mobile */}
          <div className="mb-6 lg:hidden flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-display font-bold">ELLP</div>
          </div>

          <h2 className="font-display text-2xl font-bold">Acessar o sistema</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Use seu e-mail institucional para entrar.
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <Tabs defaultValue="login" className="mt-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Criar conta</TabsTrigger>
            </TabsList>

            {/* ── Entrar ── */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-mail</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu.email@utfpr.edu.br"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-senha">Senha</Label>
                  <Input
                    id="login-senha"
                    type="password"
                    value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Entrar
                </Button>
              </form>
            </TabsContent>

            {/* ── Criar conta ── */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-nome">Nome completo</Label>
                  <Input
                    id="reg-nome"
                    type="text"
                    value={registerNome}
                    onChange={(e) => setRegisterNome(e.target.value)}
                    required
                    minLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">E-mail</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="seu.email@utfpr.edu.br"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-senha">Senha</Label>
                  <Input
                    id="reg-senha"
                    type="password"
                    value={registerSenha}
                    onChange={(e) => setRegisterSenha(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  O primeiro cadastro vira administrador. Os demais entram como
                  professor.
                </p>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Criar conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
