export const exampleStart = `
use Sholokhov\\Exchange\\Fields\\Field;
use Sholokhov\\Exchange\\Target\\Highloadblock\\Element;
use Sholokhov\\Exchange\\Factory\\Exchange\\MapperFactory;

$data = [
    [
        'code' => 'black',
        'title' => 'Черный'
    ],
    [
        'code' => 'white',
        'title' => 'Белый'
    ]
];

$map = [
    (new Field)
        ->setFrom('code')
        ->setTo('UF_XML_ID')
        ->setPrimary(),
    (new Field)
        ->setFrom('title'),
        ->setTo('UF_NAME'),
];

$repository = MapperFactory::create();
$repository->setFields($map);

$options = [
    'entity_id' => 1,
];

$exchange = new Element($options);
$exchange->setMappingRegistry($repository);
$exchange->execute($data);
`;

export const modifBefureUpdate = `
use Bitrix\\Main\\Event;
use Bitrix\\Main\\EventResult;
use Bitrix\\Main\\EventManager;

EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onBeforeHighloadblockElementUpdate',
    function(Event $event) {
        $parameters = &$event->getParameters();
        $parameters['fields']['FIELDS']['NAME'] = 'Теперь такое название';
        $parameters['fields']['PROPERTIES']['VIN'] = '.....';
        
        return new EventResult(EventResult::SUCCESS, $parameters);
    }
);
`;

export const medifBeforeUpdateCancel = `
use Bitrix\\Main\\Event;
use Bitrix\\Main\\EventResult;
use Bitrix\\Main\\EventManager;

use Sholokhov\\Exchange\\Target\\UserFields\\Enumeration;
use Sholokhov\\Exchange\\Exception\\Target\\ExchangeItemStoppedException;

/**
 *  Отмена изменения элемента нужного свойства нужной сущности 
 *  и записью в лог стандартного(системного) сообщения
**/
EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onBeforeHighloadblockElementUpdate',
    function(Event $event) {
        /** @var $exchange Enumeration **/
        $exchange = $event->getParameter('exchange');
        $parameters = $event->getParameters();
        
        if ($exchange->getHlID() === 1) {
            throw new ExchangeItemStoppedException('Так захотелось');
        }
        
        return new EventResult(EventResult::SUCCESS, $parameters);
    }
);
`;

export const errorBeforeUpdate = `
use Bitrix\\Main\\Event;
use Bitrix\\Main\\EventResult;
use Bitrix\\Main\\EventManager;

EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onBeforeHighloadblockElementUpdate',
    fn() => new EventResult(EventResult::ERROR, ['errors' => ['Ошибка 1', 'Ошибка 2']])
);
`;



export const afterUpdate = `
EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onAfterHighloadblockElementUpdate',
    fn() => CEvent::Send(....)
);
`;


export const modifBeforeAdd = `
use Bitrix\\Main\\Event;
use Bitrix\\Main\\EventResult;
use Bitrix\\Main\\EventManager;

EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onBeforeHighloadblockElementAdd',
    function(Event $event) {
        $parameters = &$event->getParameters();
        $parameters['fields']['NAME'] = 'Теперь такое название';
        
        return new EventResult(EventResult::SUCCESS, $parameters);
    }
);
`;

export const modifBeforeAddCancel = `
use Bitrix\\Main\\Event;
use Bitrix\\Main\\EventResult;
use Bitrix\\Main\\EventManager;

EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onBeforeHighloadblockElementAdd',
    fn() => throw new ExchangeItemStoppedException('Так захотелось')
);
`;

export const errorBeforeAdd = `
use Bitrix\\Main\\Event;
use Bitrix\\Main\\EventResult;
use Bitrix\\Main\\EventManager;

EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onBeforeHighloadblockElementAdd',
    fn() => new EventResult(EventResult::ERROR, ['errors' => ['Ошибка 1', 'Ошибка 2']])
);
`;

export const afterAdd = `
use Bitrix\\Main\\Event;
use Bitrix\\Main\\EventManager;

EventManager::getInstance()->addEventHandler(
    'sholokhov.exchange',
    'onAfterHighloadblockElementAdd',
    fn() => CEvent::Send(....)
);
`;