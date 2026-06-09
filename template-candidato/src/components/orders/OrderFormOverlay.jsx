import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';

const STATUS_OPTIONS = ['Pendente', 'Em Andamento', 'Finalizada', 'Cancelada'];
const EMPTY_FORM = {
  cliente_id: '',
  descricao: '',
  valor: '',
  status: 'Pendente',
};

function buildInitialForm(mode, initialOrder) {
  if (mode === 'edit' && initialOrder) {
    return {
      cliente_id: initialOrder.cliente_id ?? '',
      descricao: initialOrder.descricao ?? '',
      valor:
        initialOrder.valor === 0 || initialOrder.valor
          ? String(initialOrder.valor)
          : '',
      status: initialOrder.status ?? 'Pendente',
    };
  }
  return EMPTY_FORM;
}

function FormFields({ mode, form, errors, customers, onChange }) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground" htmlFor="order-customer">
          Cliente
        </label>
        <Select value={form.cliente_id} onValueChange={onChange('cliente_id')}>
          <SelectTrigger id="order-customer" className="w-full">
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cliente_id ? (
          <p className="text-xs text-destructive">{errors.cliente_id}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground" htmlFor="order-description">
          Descricao
        </label>
        <Textarea
          id="order-description"
          value={form.descricao}
          onChange={onChange('descricao')}
          placeholder="Descreva o servico a ser realizado"
          className="min-h-24 text-sm"
        />
        {errors.descricao ? (
          <p className="text-xs text-destructive">{errors.descricao}</p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground" htmlFor="order-value">
            Valor
          </label>
          <Input
            id="order-value"
            type="number"
            min="0"
            step="0.01"
            value={form.valor}
            onChange={onChange('valor')}
            placeholder="0,00"
            className="text-sm"
          />
          {errors.valor ? (
            <p className="text-xs text-destructive">{errors.valor}</p>
          ) : null}
        </div>

        {mode === 'create' ? (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Status</p>
            <div className="flex h-8 w-full items-center rounded-lg border border-input bg-muted/40 px-2.5 text-sm">
              Pendente
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="order-status">
              Status
            </label>
            <Select value={form.status} onValueChange={onChange('status')}>
              <SelectTrigger id="order-status" className="w-full">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status ? (
              <p className="text-xs text-destructive">{errors.status}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function FormActions({ isSubmitting, onCancel }) {
  return (
    <>
      <Button type="button" variant="outline" disabled={isSubmitting} onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </>
  );
}

function OrderFormOverlay({
  open,
  onOpenChange,
  mode,
  initialOrder = null,
  customers = [],
  onSubmit,
  isSubmitting = false,
}) {
  const isMobile = useIsMobile();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setForm(buildInitialForm(mode, initialOrder));
    setErrors({});
  }, [open, mode, initialOrder]);

  const title = useMemo(
    () => (mode === 'edit' ? 'Editar OS' : 'Nova OS'),
    [mode]
  );

  const description = useMemo(
    () =>
      mode === 'edit'
        ? 'Atualize os dados da ordem de servico.'
        : 'Preencha os dados para criar uma nova ordem de servico.',
    [mode]
  );

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChange = (field) => (eventOrValue) => {
    const value =
      typeof eventOrValue === 'string'
        ? eventOrValue
        : eventOrValue?.target?.value ?? '';
    handleFieldChange(field, value);
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.cliente_id) {
      nextErrors.cliente_id = 'Cliente e obrigatorio.';
    }
    if (!form.descricao.trim()) {
      nextErrors.descricao = 'Descricao e obrigatoria.';
    }
    if (form.valor === '') {
      nextErrors.valor = 'Valor e obrigatorio.';
    } else if (Number(form.valor) < 0 || Number.isNaN(Number(form.valor))) {
      nextErrors.valor = 'Valor invalido.';
    }
    if (!STATUS_OPTIONS.includes(form.status)) {
      nextErrors.status = 'Status invalido.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: initialOrder?.id,
      cliente_id: form.cliente_id,
      descricao: form.descricao.trim(),
      valor: Number(form.valor),
      status: mode === 'create' ? 'Pendente' : form.status,
    });
  };

  const formContent = (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormFields
        mode={mode}
        form={form}
        errors={errors}
        customers={customers}
        onChange={handleChange}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <FormActions isSubmitting={isSubmitting} onCancel={() => onOpenChange(false)} />
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="max-h-[92vh] overflow-y-auto rounded-t-2xl bg-popover text-popover-foreground"
        >
          <SheetHeader className="pr-12">
            <SheetTitle>{title}</SheetTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </SheetHeader>
          <div className="px-4 pb-4">{formContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

export default OrderFormOverlay;
