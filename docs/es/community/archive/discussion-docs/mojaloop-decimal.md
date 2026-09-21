---
i18n_source_sha: 119e51501d2e712e5fa478abe4513fa81724cd20
---

# Tipo decimal de Mojaloop; basado en el tipo decimal de XML Schema

## Tipo de valor decimal

 Definición: decimal representa un subconjunto de los números reales que se puede representar mediante numerales decimales. El espacio de valores de decimal es el conjunto de números que se pueden obtener multiplicando un entero por una potencia no positiva de diez, es decir, expresables como _i_ × 10<sup>-n</sup>, donde _i_ y _n_ son enteros y _n_ ≥ 0. La precisión no se refleja en este espacio de valores; el número 2.0 no se distingue del número 2.00. La relación de orden sobre decimal es la relación de orden sobre los números reales, restringida a este subconjunto.
 Requisito: todos los procesadores de Level One deben admitir números decimales con un mínimo de 18 dígitos decimales. No obstante, los procesadores de Level One pueden ajustarse a un límite definido por el esquema de pagos sobre el número máximo de dígitos decimales que estén preparados para admitir, que debe ser de 18 dígitos o más, en cuyo caso ese número máximo definido por el esquema de pagos debe documentarse con claridad.

## Representación léxica

decimal tiene una representación léxica que consiste en una secuencia de longitud finita de dígitos decimales (#x30 – #x39) separados por un punto como indicador decimal. Se permite un signo inicial opcional. Si se omite el signo, se asume "+". Los ceros iniciales y finales son opcionales. Si la parte fraccionaria es cero, se pueden omitir el punto y el cero o ceros que le siguen. Por ejemplo: -1.23, 12678967.543233, +100000.00, 210., 452

## Representación canónica

 La representación canónica de decimal se define prohibiendo ciertas opciones de la representación léxica (§3.2.3.1). En concreto, se prohíbe el signo "+" opcional que la precede. El punto decimal es obligatorio. Los ceros iniciales y finales están prohibidos, con lo siguiente: debe haber al menos un dígito, que puede ser un cero, a la derecha y a la izquierda del punto decimal.

 Esta forma canónica se ajusta a la representación léxica de XML Decimal, así que la aceptaría cualquier sistema conforme a XML schema.

 Lo que otros escriben en forma canónica, nosotros lo podemos leer como una representación léxica; lo que nosotros escribimos en forma canónica, otros lo pueden leer como una representación léxica. Pero rechazamos los formatos exponenciales al leer y no escribiremos en forma exponencial. Podemos comparar directamente las representaciones canónicas en cadena de dos valores para ver si son iguales.

 Al intercambiar mensajes, se prefiere una forma léxica que muestre la precisión implícita mediante ceros finales frente a la forma canónica pura, si mejora la claridad. P. ej., podríamos escribir “5.00” en lugar de “5.0” cuando la unidad de intercambio se suele especificar con precisión de dos decimales, como en USD, EUR o GBP. Esta opción de representación léxica está permitida dentro de las formas léxicas válidas tanto del decimal de XML como del decimal de Mojaloop.

## Validadores

 Validador léxico de decimal (lo que aceptan nuestros receptores de mensajes):

```^[-+]?(([0-9]+[.]?[0-9]*)|([.]?[0-9]+))$```

Validador canónico de decimal (la forma que almacenamos y comparamos; este patrón se podría usar para exigir la forma canónica en los mensajes generados):

```^([0]|([-]?[1-9][0-9]*))[.]([0]|([0-9]*[1-9]))$```

## Traducción entre las formas externa e interna

 Al convertir de la forma léxica o canónica a una representación interna binaria, el espacio de valores de la representación interna debe ser lo bastante grande para contener el rango de valores decimales específico del esquema de pagos, con un significando definido como el rango entero con signo –10<sup>_m_–1</sup>..10<sup>_m_–1</sup>, y un exponente entero no positivo en el rango –_m_..0, donde _m_ es el número máximo de dígitos decimales, al menos 18, y según lo defina el esquema de pagos concreto de Level One.

Una implementación no debe traducir entre representaciones externas decimales y cualquier representación interna binaria de punto flotante. Y todos los cálculos sobre representaciones internas de valores decimales deben producir resultados como si se hubieran hecho a mano en decimal sobre la representación externa.

Cabe señalar que el espacio de valores de un entero binario con signo de 64 bits es lo bastante grande para codificar un significando decimal con signo de 18 dígitos, y que el espacio de valores de un entero binario con signo de 6 bits es lo bastante grande para codificar el exponente en base diez no positivo que necesita.
