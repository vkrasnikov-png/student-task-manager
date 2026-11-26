# Спрощена class-діаграма

## Загальна інформація

**Назва продукту:** Student Task Manager.

**Призначення діаграми:** показати основні сутності програмного продукту, їхні властивості та зв’язки.

## Основні класи

**Student** — представляє студента (основного користувача системи), який створює та контролює навчальні завдання.

**Task** — представляє окреме навчальне завдання з назвою, описом, датою дедлайну та поточним статусом виконання.

**Subject** — представляє навчальну дисципліну, до якої належить завдання та за якою здійснюється групування робіт.

---

## Class-діаграма

```mermaid
classDiagram
    direction LR

    class Student {
        +int id
        +String name
        +String group
    }

    class Task {
        +int id
        +String title
        +String description
        +Date dueDate
        +String status
    }

    class Subject {
        +int id
        +String name
        +String teacher
    }

    Student "1" --> "*" Task
    Subject "1" --> "*" Task