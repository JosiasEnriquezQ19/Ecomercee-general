import { useState } from "react";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShop } from "@/lib/shop-store";

interface FormState {
  name: string;
  email: string;
  password: string;
}

const emptyForm: FormState = { name: "", email: "", password: "" };

function PasswordInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="••••••••"
        autoComplete="current-password"
        className="h-11 rounded-xl pr-10"
      />
      <button
        type="button"
        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export function AuthModal() {
  const { authOpen, closeAuth, login } = useShop();
  const [loginForm, setLoginForm] = useState(emptyForm);
  const [registerForm, setRegisterForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setError("Completa tu correo y contraseña.");
      return;
    }
    const name = loginForm.email.split("@")[0];
    login({ name: name.charAt(0).toUpperCase() + name.slice(1), email: loginForm.email });
    toast.success("¡Bienvenido de vuelta!");
    setLoginForm(emptyForm);
    setError(null);
    closeAuth();
  };

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setError("Completa todos los campos para registrarte.");
      return;
    }
    if (registerForm.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    login({ name: registerForm.name, email: registerForm.email });
    toast.success("¡Cuenta creada con éxito!");
    setRegisterForm(emptyForm);
    setError(null);
    closeAuth();
  };

  const errorBox = error && (
    <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
      {error}
    </p>
  );

  return (
    <Dialog open={authOpen} onOpenChange={(open) => (open ? undefined : closeAuth())}>
      <DialogContent className="max-w-md gap-0 p-0">
        <DialogHeader className="items-center gap-2 px-8 pb-4 pt-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft">
            <ShoppingBag className="size-6 text-accent-foreground" />
          </div>
          <DialogTitle className="font-display text-2xl font-bold">
            Bienvenido a Kushop
          </DialogTitle>
          <DialogDescription>
            Inicia sesión o crea una cuenta para comprar más rápido.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="px-8 pb-8">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="login" className="rounded-full">
              Iniciar sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-full">
              Registrarse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-5 flex flex-col gap-4">
            <form onSubmit={submitLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-email">Correo electrónico</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-password">Contraseña</Label>
                <PasswordInput
                  value={loginForm.password}
                  onChange={(v) => setLoginForm({ ...loginForm, password: v })}
                />
              </div>
              {errorBox}
              <Button type="submit" size="lg" className="rounded-full">
                Iniciar sesión
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Demo: cualquier correo y contraseña funcionan.
              </p>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-5 flex flex-col gap-4">
            <form onSubmit={submitRegister} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reg-name">Nombre completo</Label>
                <Input
                  id="reg-name"
                  placeholder="Tu nombre"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reg-email">Correo electrónico</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reg-password">Contraseña</Label>
                <PasswordInput
                  value={registerForm.password}
                  onChange={(v) => setRegisterForm({ ...registerForm, password: v })}
                />
              </div>
              {errorBox}
              <Button type="submit" size="lg" className="rounded-full">
                Crear cuenta
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
