<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    "accepted" => "Вы должны принять :attribute.",
    "accepted_if" => "Вы должны принять :attribute, когда :other содержит :value.",
    "active_url" => "Значение поля :attribute должно быть действительным URL адресом.",
    "after" => "Значение поля :attribute должно быть датой после :date.",
    "after_or_equal" => "Значение поля :attribute должно быть датой после или равной :date.",
    "alpha" => "Значение поля :attribute может содержать только буквы.",
    "alpha_dash" => "Значение поля :attribute может содержать только буквы, цифры, дефис и нижнее подчеркивание.",
    "alpha_num" => "Значение поля :attribute может содержать только буквы и цифры.",
    "array" => "Значение поля :attribute должно быть массивом.",
    "ascii" => "Значение поля :attribute должно содержать только однобайтовые цифро-буквенные символы.",
    "attached" => "Содержимое поля :attribute уже прикреплено.",
    "before" => "Значение поля :attribute должно быть датой до :date.",
    "before_or_equal" => "Значение поля :attribute должно быть датой до или равной :date.",
    "between.array" => "Количество элементов в поле :attribute должно быть от :min до :max.",
    "between.file" => "Размер файла в поле :attribute должен быть от :min до :max Кб.",
    "between.numeric" => "Значение поля :attribute должно быть от :min до :max.",
    "between.string" => "Количество символов в поле :attribute должно быть от :min до :max.",
    "boolean" => "Значение поля :attribute должно быть логического типа.",
    "can" => "Значение поля :attribute должно быть авторизованным.",
    "confirmed" => "Значение поля :attribute не совпадает с подтверждаемым.",
    "contains" => "В поле :attribute отсутствует необходимое значение.",
    "current_password" => "Неверный пароль.",
    "date" => "Значение поля :attribute должно быть корректной датой.",
    "date_equals" => "Значение поля :attribute должно быть датой равной :date.",
    "date_format" => "Значение поля :attribute должно соответствовать формату даты: :format.",
    "decimal" => "Значение поля :attribute должно содержать :decimal цифр десятичных разрядов.",
    "declined" => "Значение поля :attribute должно быть отклонено.",
    "declined_if" => "Значение поля :attribute должно быть отклонено, когда :other содержит :value.",
    "different" => "Значения полей :attribute и :other должны различаться.",
    "digits" => "Количество символов в поле :attribute должно быть равным :digits.",
    "digits_between" => "Количество символов в поле :attribute должно быть от :min до :max.",
    "dimensions" => "Изображение, указанное в поле :attribute, имеет недопустимые размеры.",
    "distinct" => "Элементы в значении поля :attribute не должны повторяться.",
    "doesnt_end_with" => "Значение поля :attribute не должно заканчиваться одним из следующих: :values.",
    "doesnt_start_with" => "Значение поля :attribute не должно начинаться с одного из следующих: :values.",
    "email" => "Значение поля :attribute должно быть действительным электронным адресом.",
    "ends_with" => "Значение поля :attribute должно заканчиваться одним из следующих: :values",
    "enum" => "Значение поля :attribute отсутствует в списке разрешённых.",
    "exists" => "Значение поля :attribute не существует.",
    "extensions" => "Файл в поле :attribute должен иметь одно из следующих расширений: :values.",
    "failed" => "Неверное имя пользователя или пароль.",
    "file" => "В поле :attribute должен быть указан файл.",
    "filled" => "Значение поля :attribute обязательно для заполнения.",
    "gt.array" => "Количество элементов в поле :attribute должно быть больше :value.",
    "gt.file" => "Размер файла, указанный в поле :attribute, должен быть больше :value Кб.",
    "gt.numeric" => "Значение поля :attribute должно быть больше :value.",
    "gt.string" => "Количество символов в поле :attribute должно быть больше :value.",
    "gte.array" => "Количество элементов в поле :attribute должно быть :value или больше.",
    "gte.file" => "Размер файла, указанный в поле :attribute, должен быть :value Кб или больше.",
    "gte.numeric" => "Значение поля :attribute должно быть :value или больше.",
    "gte.string" => "Количество символов в поле :attribute должно быть :value или больше.",
    "hex_color" => "Значение поля :attribute должно быть корректным цветом в HEX формате.",
    "image" => "Файл, указанный в поле :attribute, должен быть изображением.",
    "in" => "Значение поля :attribute отсутствует в списке разрешённых.",
    "in_array" => "Значение поля :attribute должно быть указано в поле :other.",
    "integer" => "Значение поля :attribute должно быть целым числом.",
    "ip" => "Значение поля :attribute должно быть действительным IP-адресом.",
    "ipv4" => "Значение поля :attribute должно быть действительным IPv4-адресом.",
    "ipv6" => "Значение поля :attribute должно быть действительным IPv6-адресом.",
    "json" => "Значение поля :attribute должно быть JSON строкой.",
    "list" => "Значение поля :attribute должно быть списком.",
    "lowercase" => "Значение поля :attribute должно быть в нижнем регистре.",
    "lt.array" => "Количество элементов в поле :attribute должно быть меньше :value.",
    "lt.file" => "Размер файла, указанный в поле :attribute, должен быть меньше :value Кб.",
    "lt.numeric" => "Значение поля :attribute должно быть меньше :value.",
    "lt.string" => "Количество символов в поле :attribute должно быть меньше :value.",
    "lte.array" => "Количество элементов в поле :attribute должно быть :value или меньше.",
    "lte.file" => "Размер файла, указанный в поле :attribute, должен быть :value Кб или меньше.",
    "lte.numeric" => "Значение поля :attribute должно быть равным или меньше :value.",
    "lte.string" => "Количество символов в поле :attribute должно быть :value или меньше.",
    "mac_address" => "Значение поля :attribute должно быть корректным MAC-адресом.",
    "max.array" => "Количество элементов в поле :attribute не может превышать :max.",
    "max.file" => "Размер файла в поле :attribute не может быть больше :max Кб.",
    "max.numeric" => "Значение поля :attribute не может быть больше :max.",
    "max.string" => "Количество символов в значении поля :attribute не может превышать :max.",
    "max_digits" => "Значение поля :attribute не должно содержать больше :max цифр.",
    "mimes" => "Файл, указанный в поле :attribute, должен быть одного из следующих типов: :values.",
    "mimetypes" => "Файл, указанный в поле :attribute, должен быть одного из следующих типов: :values.",
    "min.array" => "Количество элементов в поле :attribute должно быть не меньше :min.",
    "min.file" => "Размер файла, указанный в поле :attribute, должен быть не меньше :min Кб.",
    "min.numeric" => "Значение поля :attribute должно быть не меньше :min.",
    "min.string" => "Количество символов в поле :attribute должно быть не меньше :min.",
    "min_digits" => "Значение поля :attribute должно содержать не меньше :min цифр.",
    "missing" => "Значение поля :attribute должно отсутствовать.",
    "missing_if" => "Значение поля :attribute должно отсутствовать, когда :other содержит :value.",
    "missing_unless" => "Значение поля :attribute должно отсутствовать, когда :other не содержит :value.",
    "missing_with" => "Значение поля :attribute должно отсутствовать, если :values указано.",
    "missing_with_all" => "Значение поля :attribute должно отсутствовать, когда указаны все :values.",
    "multiple_of" => "Значение поля :attribute должно быть кратным :value",
    "next" => "Вперёд &raquo;",
    "not_in" => "Значение поля :attribute находится в списке запрета.",
    "not_regex" => "Значение поля :attribute имеет некорректный формат.",
    "numeric" => "Значение поля :attribute должно быть числом.",
    "password" => "Некорректный пароль.",
    "password.letters" => "Значение поля :attribute должно содержать хотя бы одну букву.",
    "password.mixed" => "Значение поля :attribute должно содержать хотя бы одну прописную и одну строчную буквы.",
    "password.numbers" => "Значение поля :attribute должно содержать хотя бы одну цифру.",
    "password.symbols" => "Значение поля :attribute должно содержать хотя бы один символ.",
    "password.uncompromised" => "Значение поля :attribute обнаружено в утечках данных. Пожалуйста, выберите другой.",

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
