import './style.scss'

import ContainerDashboard from './ContainerDashboard'
import ContainerDashboardCards from './ContainerDashboardCards'
import ContainerDashboardCard from './ContainerDashboardCard'
import ContainerDashboardTitle from './ContainerDashboardTitle'
import ContainerDashboardDivisor from './ContainerDashboarDivisor'
import ContainerDashboardCardText from './ContainerDashboardCardText'
import ContainerDashboardTags from './ContainerDashboardCardTags'
import ContainerDashboardTag from './ContainerDashboardTag'

export const Container = {
    Root: ContainerDashboard,
    Cards: ContainerDashboardCards,
    Card: ContainerDashboardCard,
    Title: ContainerDashboardTitle,
    Divisor: ContainerDashboardDivisor,
    Text: ContainerDashboardCardText,
    Tags: ContainerDashboardTags,
    Tag: ContainerDashboardTag
}
