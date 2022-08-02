app.component('Product', {
  template: `
    <section class="product">
          <div class="product__thumbnails">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="thumb"
              :class="{active: activeImage == index}"
              :style="{backgroundImage: 'url(' + image.thumbnail + ')'}"
              @click="activeImage = index"
            ></div>
          </div>
          <div class="product__image">
            <img :src="product.images[activeImage].image" :alt="product.name" />
          </div>
        </section>
        <section class="description">
          <h4>
            {{product.name.toUpperCase()}} {{product.stock === 0 ? "😢" : "😎"}}
          </h4>
          <Badge :product="product"></Badge>
          <p class="description__status" v-if="product.stock ==3">
            Quedan pocas unidades
          </p>
          <p class="description__status" v-else-if="product.stock <=2">
            El producto está por terminarse
          </p>
          <p class="description__status" v-else>Producto disponible</p>
          <p class="description__price" :style="{color:price_color}">$ {{formatPrice(product.price)}}</p>
          <p class="description__content">{{product.content}}</p>
          <div class="discount">
            <span>Codigo de descuento:</span>
            <input
              type="text"
              placeholder="Ingresa tu código"
              @keyup.enter="aplicarDescuento($event)"
            />
          </div>
          <button :disabled="product.stock==0" @click="sendToCart()">
            Agregar al carrito
          </button>
        </section>
    `,
  props: ['product'],
  emits: ['sendToCart'],
  setup (props, { emit }) {
    // const product = reactive()

    const formatPrice = value => {
      return Intl.NumberFormat('es-CO').format(value)
    }

    const activeImage = ref(0)
    // const price_color = ref('rgb(104,104,209)')

    const discountCodes = ['AGOE2022', 'Asdf1234', 'TRni1234']

    const aplicarDescuento = event => {
      // console.log(event.target.value);
      const cod = event.target.value
      const discountCodeIndex = discountCodes.indexOf(cod)
      // console.log(discountCodeIndex);
      if (discountCodeIndex >= 0) {
        props.product.price *= 50 / 100
        discountCodes.splice(discountCodeIndex, 1)
      }
    }

    const sendToCart = () => {
      emit('sendToCart', props.product)
    }

    // watch(
    //   () => props.product.stock,
    //   stock => {
    //     if (stock <= 1) {
    //       price_color.value = 'rgb(100,30,67)'
    //     }
    //   }
    // )

    const price_color = computed(() => {
      if (props.product.stock <= 1) {
        return 'rgb(100,30,67)'
      }
    })

    return {
      activeImage,
      price_color,
      // product,
      formatPrice,
      aplicarDescuento,
      sendToCart
    }
  }
})
