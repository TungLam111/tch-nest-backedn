import { AbstractEntity } from 'src/helper/common/common-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentMethod extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  paymentMethodType: string;
}

export function PaymentMethodCreateInput(createPaymentMethodDto: {
  name: string;
  description: string;
  paymentMethodType: string;
}): PaymentMethod {
  const createDto: PaymentMethod = new PaymentMethod();
  createDto.name = createPaymentMethodDto.name;
  createDto.description = createPaymentMethodDto.description;
  createDto.paymentMethodType = createPaymentMethodDto.paymentMethodType;
  return createDto;
}

export function PaymentMethodUpdateInput(
  currentPaymentMethod: PaymentMethod,
  updatePaymentMethodDto: {
    name?: string;
    description?: string;
    paymentMethodType?: string;
  },
): PaymentMethod {
  const updatePaymentMethod: PaymentMethod = {
    ...currentPaymentMethod,
  };

  if (updatePaymentMethodDto.name != undefined) {
    updatePaymentMethod.name = updatePaymentMethodDto.name;
  }
  if (updatePaymentMethodDto.description != undefined) {
    updatePaymentMethod.description = updatePaymentMethodDto.description;
  }
  if (updatePaymentMethodDto.paymentMethodType != undefined) {
    updatePaymentMethod.paymentMethodType =
      updatePaymentMethodDto.paymentMethodType;
  }

  return updatePaymentMethod;
}
