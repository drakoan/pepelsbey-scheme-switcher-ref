# pepelsbey-scheme-switcher-ref
Reafactoring of scheme-switcher by Vadim Makeev https://pepelsbey.github.io/playground/scheme-switcher/

1. Принцип единственной ответственности
2. Более аккуратные названия + все действия и проверки имеют свои названия
3. более "плоский" код (одна функция вызывает все по очереди)
  + не запутанное дерево вызовов (чтение кода сверху вниз/снизу вверх, а не клубком)
4. высушенный код (нет копирования кода)
5. стрелочные функции, только одна функция с контекстом
