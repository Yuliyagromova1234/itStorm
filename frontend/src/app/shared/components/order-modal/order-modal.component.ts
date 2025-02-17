import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {CategoriesType} from "../../../../types/categories.type";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnChanges, OnInit {
  @Input() service?: string;
  @Input() isVisible: boolean = false;
  @Input() serviceInput: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  modalState = {
    isVisible: false,
    isSubmitted: false
  };

  submitError = false;
  submitErrorMessage = 'При отправке произошла ошибка. Попробуйте ещё раз позже.';

  modalForm = this.fb.group({
    service: [''],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+7\d{10}|8\d{10}$/)]],
  });

  categories: CategoriesType[] = [];

  constructor(private fb: FormBuilder, private orderService: OrderService,
              private categoriesService: CategoriesService) {
  }


  ngOnChanges() {
    this.modalState.isVisible = this.isVisible;
    this.modalForm.get('service')?.setValue(this.service ?? '');
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }


  closeModal() {
    this.modalState.isVisible = false;
    this.isVisibleChange.emit(this.modalState.isVisible);
    this.modalState.isSubmitted = false;
    this.modalForm.reset();
  }

  sendOrder() {
    if (this.modalForm.valid) {
      const requestData = this.serviceInput
        ? {
          service: this.modalForm.get('service')?.value,
          type: 'order' as const
        }
        : {type: 'consultation' as const};

      const userData = {
        name: this.modalForm.get('name')?.value ?? '',
        phone: this.modalForm.get('phone')?.value ?? '',
      };

      const data = {...requestData, ...userData};

      this.orderService.request(data).subscribe(
        () => (this.modalState.isSubmitted = true),
        (err) => {
          this.submitErrorMessage = err.error.message;
          this.submitError = true;
        }
      );
    } else {
      this.modalForm.markAllAsTouched();
      this.submitError = true;
      this.submitErrorMessage = 'Заполните все обязательные поля';
    }
  }
}
