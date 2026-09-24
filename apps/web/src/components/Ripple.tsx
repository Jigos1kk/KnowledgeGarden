import { useEffect, useRef, useState } from 'react';

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleProps {
  /** Цвет пульсации. По умолчанию наследует цвет текста родителя (currentColor). */
  color?: string;
  /** Длительность анимации, мс. */
  duration?: number;
  /** Дополнительные классы для слоя пульсации. */
  className?: string;
}

let rippleId = 0;

/**
 * Пульсация (ripple) при нажатии.
 *
 * Компонент слушает `pointerdown` на родительском элементе, поэтому его можно
 * прикрепить к любому элементу. Родитель должен быть:
 *  - `position: relative` — абсолютный слой позиционируется относительно него;
 *  - `overflow: hidden` — чтобы пульсация обрезалась по скруглённым углам.
 *
 * Пример:
 *   <div className="relative overflow-hidden rounded-xl">
 *     <button>Нажми</button>
 *     <Ripple />
 *   </div>
 */
export function Ripple({ color = 'currentColor', duration = 600, className = '' }: RippleProps) {
  const layerRef = useRef<HTMLSpanElement>(null);
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;

    const handlePointerDown = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const id = rippleId++;

      setRipples((prev) => [...prev, { id, x, y, size }]);

      const timer = window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== id));
      }, duration);
      timersRef.current.push(timer);
    };

    host.addEventListener('pointerdown', handlePointerDown);

    return () => {
      host.removeEventListener('pointerdown', handlePointerDown);
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, [duration]);

  return (
    <span
      ref={layerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`.trim()}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="animate-ripple absolute rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
          }}
        />
      ))}
    </span>
  );
}

export default Ripple;
