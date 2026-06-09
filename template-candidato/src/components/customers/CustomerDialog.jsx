import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EMPTY_FORM = {
  nome: '',
  email: '',
  telefone: '',
};

function CustomerDialog({
  open,
  onOpenChange,
  mode,
  initialCustomer,
  onSubmit,
  isSubmitting = false,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    if (mode === 'edit' && initialCustomer) {
      setForm({
        nome: initialCustomer.nome ?? '',
        email: initialCustomer.email ?? '',
        telefone: initialCustomer.telefone ?? '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [open, mode, initialCustomer]);

  const title = useMemo(
    () => (mode === 'edit' ? 'Editar Cliente' : 'Novo Cliente'),
    [mode]
  );

  const description = useMemo(
    () =>
      mode === 'edit'
        ? 'Atualize as informacoes do cliente.'
        : 'Preencha os dados para cadastrar um novo cliente.',
    [mode]
  );

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.nome.trim()) {
      nextErrors.nome = 'Nome e obrigatorio.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Email e obrigatorio.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Email invalido.';
    }
    if (!form.telefone.trim()) {
      nextErrors.telefone = 'Telefone e obrigatorio.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...initialCustomer,
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md sm:max-w-lg ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="customer-name">
              Nome
            </label>
            <Input
              id="customer-name"
              value={form.nome}
              onChange={handleChange('nome')}
              placeholder="Nome do cliente"
              className="md:text-sm text-xs"
            />
            {errors.nome && (
              <p className="text-xs text-destructive">{errors.nome}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="customer-email">
              Email
            </label>
            <Input
              id="customer-email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="email@exemplo.com"
              className="md:text-sm text-xs"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="customer-phone">
              Telefone
            </label>
            <Input
              id="customer-phone"
              value={form.telefone}
              onChange={handleChange('telefone')}
              placeholder="(11) 99999-9999"
              className="md:text-sm text-xs"
            />
            {errors.telefone && (
              <p className="text-xs text-destructive">{errors.telefone}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
              className="md:text-sm text-xs"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="md:text-sm text-xs">
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerDialog;

