import './style.scss'

import ContainerDashboard from './ContainerDashboard'
import ContainerDashboardHeader from './ContainerDashboardHeader'
import ContainerDashboardTitle from './ContainerDashboardTitle'
import ContainerDashboardDivisor from './ContainerDashboarDivisor'
import ContainerDashboardCards from './ContainerDashboardCards'
import ContainerDashboardCard from './ContainerDashboardCard'
import ContainerDashboardCardText from './ContainerDashboardCardText'
import ContainerDashboardTags from './ContainerDashboardCardTags'
import ContainerDashboardTag from './ContainerDashboardTag'

import { IconPlus, IconClose, IconBack, IconEdit, IconTrash } from './Icon'

export const Container = {
    Root: ContainerDashboard,
    Header: ContainerDashboardHeader,
    Title: ContainerDashboardTitle,
    Divisor: ContainerDashboardDivisor,
    Cards: ContainerDashboardCards,
    Card: ContainerDashboardCard,
    Text: ContainerDashboardCardText,
    Tags: ContainerDashboardTags,
    Tag: ContainerDashboardTag,

    IconPlus: IconPlus,
    IconClose: IconClose,
    IconBack: IconBack,
    IconEdit: IconEdit,
    IconTrash: IconTrash,
}
