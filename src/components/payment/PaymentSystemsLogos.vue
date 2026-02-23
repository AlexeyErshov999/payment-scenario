<template>
  <div class="payment-logos">
    <span class="payment-logos__visa">VISA</span>
    <span class="payment-logos__mir">
      <span class="payment-logos__mir-circles" aria-hidden="true">
        <span class="payment-logos__circle payment-logos__circle--red" />
        <span class="payment-logos__circle payment-logos__circle--yellow" />
      </span>
      МИР
    </span>
  </div>
</template>

<style lang="scss" scoped>
.payment-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.payment-logos__visa {
  font-size: 18px;
  font-weight: 700;
  color: #1a1f71;
  letter-spacing: 0.05em;

  @media (min-width: 640px) {
    font-size: 20px;
  }
}

.payment-logos__mir {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 16px;
  font-weight: 600;
  color: #1a1f71;
  letter-spacing: 0.02em;

  @media (min-width: 640px) {
    font-size: 18px;
  }
}

.payment-logos__mir-circles {
  position: relative;
  display: inline-flex;
  width: 14px;
  height: 14px;

  @media (min-width: 640px) {
    width: 16px;
    height: 16px;
  }
}

.payment-logos__circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  &--red {
    background: #df2b27;
    left: 0;
    top: 0;
    transform: translate(-20%, 0);
  }

  &--yellow {
    background: #f5c741;
    right: 0;
    top: 0;
    transform: translate(20%, 0);
  }
}
</style>
