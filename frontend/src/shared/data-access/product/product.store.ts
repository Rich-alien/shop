import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Product, ProductDto, ProductService } from '@shared/data-access';
import {
  addEntity,
  removeEntity,
  SelectEntityId,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filter, pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';

const selectId: SelectEntityId<Product> = (ns): string => ns.uuid;

export const ProductStore = signalStore(
  withEntities<Product>(),
  withProps((_, productService = inject(ProductService)) => {
    return {
      _productService: productService,
    };
  }),
  withState({ isLoaded: false }),
  withMethods((store) => {
    const init = rxMethod<void>(
      pipe(
        filter(() => !store.isLoaded()),
        switchMap(() => store._productService.getAllProduct()),
        tap((products) =>
          patchState(store, { isLoaded: true }, setAllEntities(products, { selectId })),
        ),
      ),
    );
    const createProduct = rxMethod<ProductDto>(
      pipe(
        switchMap((product) => store._productService.createProduct(product)),
        tap((product) => patchState(store, addEntity(product, { selectId }))),
      ),
    );

    const removeProduct = rxMethod<string>(
      pipe(
        switchMap((id) => store._productService.removeProduct(id)),
        tap((product) => patchState(store, removeEntity(product.uuid))),
      ),
    );
    return {
      init,
      createProduct,
      removeProduct,
    };
  }),
  withHooks((store) => {
    return {
      onInit: () => store.init(),
    };
  }),
);
export type ProductStore = InstanceType<typeof ProductStore>;
