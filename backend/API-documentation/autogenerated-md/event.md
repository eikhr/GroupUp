# Event Schema

```txt
/object-schemas/product.schema.json
```

An event from the GroupUp API

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [event.schema.json](../../out/object-schemas/event.schema.json "open original schema") |

## Event Type

`object` ([Event](event.md))

# Event Properties

| Property                    | Type      | Required | Nullable       | Defined by                                                                                             |
| :-------------------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------- |
| [id](#id)                   | `integer` | Required | cannot be null | [Event](event-properties-id.md "/object-schemas/product.schema.json#/properties/id")                   |
| [title](#title)             | `string`  | Required | cannot be null | [Event](event-properties-title.md "/object-schemas/product.schema.json#/properties/title")             |
| [description](#description) | `string`  | Required | cannot be null | [Event](event-properties-description.md "/object-schemas/product.schema.json#/properties/description") |
| [time](#time)               | `string`  | Optional | cannot be null | [Event](event-properties-time.md "/object-schemas/product.schema.json#/properties/time")               |

## id

The unique identifier for an event

`id`

*   is required

*   Type: `integer`

*   cannot be null

*   defined in: [Event](event-properties-id.md "/object-schemas/product.schema.json#/properties/id")

### id Type

`integer`

## title

Title of the event

`title`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Event](event-properties-title.md "/object-schemas/product.schema.json#/properties/title")

### title Type

`string`

## description

Description of the event

`description`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Event](event-properties-description.md "/object-schemas/product.schema.json#/properties/description")

### description Type

`string`

## time

The date/time when the event is to take place

`time`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Event](event-properties-time.md "/object-schemas/product.schema.json#/properties/time")

### time Type

`string`

### time Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")
