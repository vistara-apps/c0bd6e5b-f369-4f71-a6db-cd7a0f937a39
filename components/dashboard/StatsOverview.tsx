'use client';

import { TrendingUp, Music, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatNumber, formatPrice } from '@/lib/utils';

const stats = [
  {
    title: 'Total Plays',
    value: '24.8K',
    change: '+12.5%',
    icon: Music,
    color: 'text-primary',
    bgColor: 'bg-primary/20',
  },
  {
    title: 'Active Users',
    value: '1.2K',
    change: '+8.2%',
    icon: Users,
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
  {
    title: 'Revenue',
    value: '45.6 ETH',
    change: '+23.1%',
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-500/20',
  },
  {
    title: 'Growth',
    value: '+18.2%',
    change: '+4.3%',
    icon: TrendingUp,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/20',
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">{stat.title}</p>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-green-500 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
